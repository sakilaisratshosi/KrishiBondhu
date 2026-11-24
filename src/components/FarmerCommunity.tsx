import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import {
  Heart,
  Info,
  MessageCircle,
  Plus,
  RotateCcw,
  Send,
  ShieldCheck,
  Upload,
} from 'lucide-react';
import { findDistrictById } from '../data/bangladeshDistricts';
import {
  ASSETS,
  CROP_OPTIONS,
  INITIAL_COMMUNITY_POSTS,
} from '../data/krishiData';
import {
  CommunityPost,
  CropKey,
  FarmerProfile,
  Language,
  PageRoute,
} from '../types/krishi';
import { ResilientImage } from './ResilientImage';
import { SourceQualityNotice } from './SourceQualityNotice';
import { WorkspaceHeader } from './WorkspaceHeader';

interface FarmerCommunityProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onNavigate: (page: PageRoute) => void;
  farmerProfile?: FarmerProfile | null;
}

const COMMUNITY_STORAGE_KEY = 'krishibondhu_community_posts_v1';

function loadCommunityPosts(): CommunityPost[] {
  try {
    const raw = window.localStorage.getItem(COMMUNITY_STORAGE_KEY);
    if (!raw) return INITIAL_COMMUNITY_POSTS;
    const parsed = JSON.parse(raw) as CommunityPost[] | null;
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return INITIAL_COMMUNITY_POSTS;
    }
    return parsed;
  } catch {
    return INITIAL_COMMUNITY_POSTS;
  }
}

export function FarmerCommunity({
  language,
  onToggleLanguage,
  onNavigate,
  farmerProfile,
}: FarmerCommunityProps) {
  const bn = language === 'bn';
  const [posts, setPosts] = useState<CommunityPost[]>(() => loadCommunityPosts());
  const [cropFilter, setCropFilter] = useState<'all' | CropKey>('all');
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({
    'post-1': true,
  });
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const defaultAuthor = farmerProfile?.name || (bn ? 'করিম মিয়া (নমুনা)' : 'Karim Mia (Sample)');
  const defaultLocation = useMemo(() => {
    if (!farmerProfile) return bn ? 'বগুড়া সদর' : 'Bogura Sadar';
    const d = findDistrictById(farmerProfile.districtId);
    const distName = d ? (bn ? d.bn : d.en) : farmerProfile.districtId;
    return farmerProfile.upazila
      ? `${farmerProfile.upazila}, ${distName}`
      : distName;
  }, [farmerProfile, bn]);

  // New Post Composer State
  const [showComposer, setShowComposer] = useState(false);
  const [authorName, setAuthorName] = useState(defaultAuthor);
  const [locationName, setLocationName] = useState(defaultLocation);
  const [newCrop, setNewCrop] = useState<CropKey>(
    farmerProfile?.primaryCrop || 'rice'
  );
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [postImage, setPostImage] = useState<string>('');
  const [postImageName, setPostImageName] = useState<string>('');
  const [postError, setPostError] = useState('');
  const [storageWarning, setStorageWarning] = useState('');

  useEffect(() => {
    try {
      window.localStorage.setItem(COMMUNITY_STORAGE_KEY, JSON.stringify(posts));
      setStorageWarning('');
    } catch {
      setStorageWarning(
        bn
          ? 'ব্রাউজার স্টোরেজ সীমা অতিক্রম করায় এই সেশনের বড় ছবি-সহ পোস্ট স্থায়ীভাবে সংরক্ষিত নাও হতে পারে।'
          : 'Browser storage quota was reached; large uploaded images may stay visible only during this session.'
      );
    }
  }, [posts, bn]);

  const visiblePosts = useMemo(() => {
    if (cropFilter === 'all') return posts;
    return posts.filter((p) => p.crop === cropFilter);
  }, [posts, cropFilter]);

  const toggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const liked = !post.likedByMe;
        return {
          ...post,
          likedByMe: liked,
          likes: liked ? post.likes + 1 : Math.max(0, post.likes - 1),
        };
      })
    );
  };

  const toggleComments = (postId: string) => {
    setOpenComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleAddComment = (e: FormEvent, postId: string) => {
    e.preventDefault();
    const text = (commentInputs[postId] || '').trim();
    if (!text) return;

    const commenterBn = farmerProfile?.name
      ? `${farmerProfile.name} (আপনি)`
      : 'করিম মিয়া (আপনি)';
    const commenterEn = farmerProfile?.name
      ? `${farmerProfile.name} (You)`
      : 'Karim Mia (You)';

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: `com-${Date.now()}`,
              author: { bn: commenterBn, en: commenterEn },
              text: { bn: text, en: text },
              timestamp: { bn: 'এইমাত্র', en: 'Just now' },
            },
          ],
        };
      })
    );
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    setOpenComments((prev) => ({ ...prev, [postId]: true }));
  };

  const handlePostImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setPostError(
        bn
          ? 'অনুগ্রহ করে কেবল ছবির ফাইল (JPG, PNG, WebP) নির্বাচন করুন।'
          : 'Please choose a valid image file (JPG, PNG, or WebP).'
      );
      return;
    }
    if (file.size > 2.5 * 1024 * 1024) {
      setPostError(
        bn
          ? 'ছবির আকার ২.৫ মেগাবাইটের কম হতে হবে।'
          : 'Please choose an image smaller than 2.5 MB.'
      );
      return;
    }
    setPostError('');
    setPostImageName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPostImage(reader.result);
      }
    };
    reader.onerror = () => {
      setPostError(
        bn
          ? 'ছবিটি পড়তে সমস্যা হয়েছে। অনুগ্রহ করে অন্য একটি ছবি চেষ্টা করুন।'
          : 'Could not read the selected image. Please try another file.'
      );
    };
    reader.readAsDataURL(file);
  };

  const handleCreatePost = (e: FormEvent) => {
    e.preventDefault();
    setPostError('');

    if (!postTitle.trim() || !postBody.trim()) {
      setPostError(
        bn
          ? 'অনুগ্রহ করে পোস্টের শিরোনাম এবং বিস্তারিত বিবরণ লিখুন।'
          : 'Please fill in both the post title and description.'
      );
      return;
    }

    const cropMeta =
      CROP_OPTIONS.find((c) => c.key === newCrop)?.label || CROP_OPTIONS[0].label;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: {
        bn: authorName.trim() || defaultAuthor,
        en: authorName.trim() || defaultAuthor,
      },
      location: {
        bn: locationName.trim() || defaultLocation,
        en: locationName.trim() || defaultLocation,
      },
      crop: newCrop,
      cropLabel: cropMeta,
      timestamp: { bn: 'এইমাত্র (ডেমো পোস্ট)', en: 'Just now (Demo Post)' },
      title: { bn: postTitle.trim(), en: postTitle.trim() },
      body: { bn: postBody.trim(), en: postBody.trim() },
      imageUrl: postImage || undefined,
      likes: 1,
      likedByMe: true,
      expertAdvice: {
        bn: 'নমুনা কৃষি কর্মকর্তা পরামর্শ: আপনার পোস্টের জন্য ধন্যবাদ! মাঠের যেকোনো রোগ বা আবহাওয়া-সংক্রান্ত সিদ্ধান্তে স্থানীয় উপসহকারী কৃষি কর্মকর্তা বা ১৬১২৩ নম্বরের পরামর্শ নিন।',
        en: 'Sample Expert Advice: Thank you for sharing! Always verify field treatments with your local agricultural extension officer or 16123.',
      },
      comments: [],
    };

    setPosts((prev) => [newPost, ...prev]);
    setPostTitle('');
    setPostBody('');
    setPostImage('');
    setPostImageName('');
    setShowComposer(false);
    setOpenComments((prev) => ({ ...prev, [newPost.id]: true }));
  };

  const handleResetCommunity = () => {
    setPosts(INITIAL_COMMUNITY_POSTS);
    setCropFilter('all');
    setOpenComments({ 'post-1': true });
  };

  return (
    <div className="bg-[var(--kb-canvas)] min-h-screen">
      <WorkspaceHeader
        breadcrumbLabel={bn ? 'কৃষক কমিউনিটি' : 'Farmer Community'}
        title={
          bn
            ? 'কৃষক কমিউনিটি ও বিশেষজ্ঞ নমুনা পরামর্শ'
            : 'Farmer Community & Sample Expert Advice'
        }
        subtitle={
          bn
            ? 'কৃষকদের অভিজ্ঞতা পড়ুন, লাইক ও মন্তব্য করুন, অথবা নতুন একটি নমুনা পোস্ট প্রকাশ করুন।'
            : 'Read sample grower stories, like and comment on field updates, or create a new demo post.'
        }
        language={language}
        onToggleLanguage={onToggleLanguage}
        onNavigate={onNavigate}
        backRoute="dashboard"
        backLabel={bn ? 'ড্যাশবোর্ড' : 'Dashboard'}
      />

      <div className="max-w-[1060px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Sample Disclaimer + New Post Toggle */}
        <div className="bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[var(--kb-brand-text)] shrink-0 mt-0.5" />
            <p className="text-sm text-[var(--kb-ink)]">
              <strong className="font-semibold">
                {bn ? 'নমুনা কমিউনিটি প্রদর্শনী: ' : 'Sample Community Demo: '}
              </strong>
              <span className="text-[var(--kb-ink-muted)]">
                {bn
                  ? 'পোস্ট, লাইক, মন্তব্য ও বিশেষজ্ঞ পরামর্শসমূহ প্রদর্শনের জন্য আপনার ব্রাউজারের localStorage-এ সিমুলেটেড নমুনা ডেটা।'
                  : 'Posts, likes, comments, and expert advice notes run locally in your browser as prototype demonstrations.'}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleResetCommunity}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-2 text-xs font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface)] hover:bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{bn ? 'রিসেট' : 'Reset'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                if (!showComposer) {
                  setAuthorName(defaultAuthor);
                  setLocationName(defaultLocation);
                }
                setShowComposer((prev) => !prev);
              }}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>
                {showComposer
                  ? bn
                    ? 'ফর্ম বন্ধ করুন'
                    : 'Close Form'
                  : bn
                  ? 'নতুন ডেমো পোস্ট লিখুন'
                  : 'Create Demo Post'}
              </span>
            </button>
          </div>
        </div>

        {storageWarning && (
          <div
            role="status"
            className="bg-[var(--kb-warn-bg)] border border-[var(--kb-warn-border)] rounded-xl px-4 py-3 text-xs font-medium text-[var(--kb-warn-text)]"
          >
            {storageWarning}
          </div>
        )}

        {/* Create New Demo Post Form */}
        {showComposer && (
          <form
            onSubmit={handleCreatePost}
            className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-4"
          >
            <h2 className="text-lg font-bold text-[var(--kb-ink)] pb-3 border-b border-[var(--kb-border-subtle)]">
              {bn ? 'নতুন ডেমো পোস্ট তৈরি করুন' : 'Create a New Demo Post'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="post-author"
                  className="block text-xs font-semibold text-[var(--kb-ink)]"
                >
                  {bn ? 'কৃষকের নাম' : 'Farmer Name'}
                </label>
                <input
                  id="post-author"
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full min-h-[40px] px-3 py-2 text-sm bg-[var(--kb-surface-muted)] text-[var(--kb-ink)] border border-[var(--kb-border)] rounded-lg"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="post-location"
                  className="block text-xs font-semibold text-[var(--kb-ink)]"
                >
                  {bn ? 'এলাকা / জেলা' : 'Location'}
                </label>
                <input
                  id="post-location"
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full min-h-[40px] px-3 py-2 text-sm bg-[var(--kb-surface-muted)] text-[var(--kb-ink)] border border-[var(--kb-border)] rounded-lg"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="post-crop"
                  className="block text-xs font-semibold text-[var(--kb-ink)]"
                >
                  {bn ? 'ফসল' : 'Crop'}
                </label>
                <select
                  id="post-crop"
                  value={newCrop}
                  onChange={(e) => setNewCrop(e.target.value as CropKey)}
                  className="w-full min-h-[40px] px-3 py-2 text-sm bg-[var(--kb-surface-muted)] text-[var(--kb-ink)] border border-[var(--kb-border)] rounded-lg"
                >
                  {CROP_OPTIONS.map((c) => (
                    <option key={c.key} value={c.key}>
                      {bn ? c.label.bn : c.label.en}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="post-title"
                className="block text-xs font-semibold text-[var(--kb-ink)]"
              >
                {bn ? 'পোস্টের শিরোনাম' : 'Post Headline'}
              </label>
              <input
                id="post-title"
                type="text"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                placeholder={
                  bn
                    ? 'যেমন: সকালের সেচ ও মাল্চিং ব্যবহারে ভালো ফলন পাচ্ছি'
                    : 'e.g., Good results using morning irrigation and straw mulch'
                }
                className="w-full min-h-[42px] px-3 py-2 text-sm bg-[var(--kb-surface-muted)] text-[var(--kb-ink)] border border-[var(--kb-border)] rounded-lg"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="post-body"
                className="block text-xs font-semibold text-[var(--kb-ink)]"
              >
                {bn ? 'বিস্তারিত অভিজ্ঞতা বা প্রশ্ন' : 'Details or Question'}
              </label>
              <textarea
                id="post-body"
                rows={3}
                value={postBody}
                onChange={(e) => setPostBody(e.target.value)}
                placeholder={
                  bn
                    ? 'আপনার মাঠের পর্যবেক্ষণ বা ফসলের অভিজ্ঞতা লিখুন...'
                    : 'Share your field observation or question...'
                }
                className="w-full p-3 text-sm bg-[var(--kb-surface-muted)] text-[var(--kb-ink)] border border-[var(--kb-border)] rounded-lg"
              />
            </div>

            <div className="space-y-3 pt-1">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <label className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface-sage)] hover:bg-[var(--kb-surface-sage-strong)] border border-[var(--kb-border)] rounded-lg cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>
                      {bn ? 'ফসলের ছবি আপলোড করুন' : 'Upload Crop Photo'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePostImageUpload}
                      className="sr-only"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setPostImage(ASSETS.riceBlast);
                      setPostImageName(bn ? 'নমুনা ধানের পাতা' : 'Sample rice leaf');
                      setPostError('');
                    }}
                    className="px-3 py-2 text-xs font-medium text-[var(--kb-ink-muted)] bg-[var(--kb-surface-muted)] hover:bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-lg cursor-pointer"
                  >
                    {bn ? 'নমুনা ছবি যোগ করুন' : 'Use Sample Photo'}
                  </button>
                </div>

                <button
                  type="submit"
                  className="min-h-[44px] px-6 py-2.5 text-sm font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg cursor-pointer"
                >
                  {bn ? 'ডেমো পোস্ট প্রকাশ করুন' : 'Publish Demo Post'}
                </button>
              </div>

              {postImage && (
                <div className="p-3 bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-16 h-12 rounded overflow-hidden border border-[var(--kb-border)] shrink-0">
                      <ResilientImage
                        src={postImage}
                        alt={bn ? 'পোস্ট ছবির প্রিভিউ' : 'Post photo preview'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs font-medium text-[var(--kb-ink)] truncate">
                      {postImageName ||
                        (bn ? 'নির্বাচিত ছবি প্রিভিউ' : 'Selected image preview')}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setPostImage('');
                      setPostImageName('');
                    }}
                    className="text-xs font-semibold text-[var(--kb-danger-text)] hover:underline shrink-0 cursor-pointer"
                  >
                    {bn ? 'ছবি সরান' : 'Remove'}
                  </button>
                </div>
              )}
            </div>

            {postError && (
              <p role="alert" className="text-xs font-medium text-[var(--kb-danger-text)]">
                {postError}
              </p>
            )}
          </form>
        )}

        {/* Crop Filter Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-lg">
            <button
              type="button"
              onClick={() => setCropFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                cropFilter === 'all'
                  ? 'bg-[var(--kb-brand)] text-white'
                  : 'text-[var(--kb-ink-muted)] hover:text-[var(--kb-ink)]'
              }`}
            >
              {bn ? 'সব ফসল' : 'All Crops'}
            </button>
            {CROP_OPTIONS.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setCropFilter(c.key)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  cropFilter === c.key
                    ? 'bg-[var(--kb-brand)] text-white'
                    : 'text-[var(--kb-ink-muted)] hover:text-[var(--kb-ink)]'
                }`}
              >
                {bn ? c.label.bn : c.label.en}
              </button>
            ))}
          </div>
          <span className="text-xs text-[var(--kb-ink-muted)] tabular-nums">
            {visiblePosts.length} {bn ? 'টি পোস্ট' : 'posts'}
          </span>
        </div>

        {/* Community Feed */}
        {visiblePosts.length === 0 ? (
          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-8 text-center space-y-3">
            <p className="text-sm font-bold text-[var(--kb-ink)]">
              {bn
                ? 'এই ফসলের জন্য এখনো কোনো নমুনা পোস্ট নেই'
                : 'No demo posts under this crop filter yet'}
            </p>
            <button
              type="button"
              onClick={() => setCropFilter('all')}
              className="px-4 py-2 text-xs font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface-sage)] hover:bg-[var(--kb-surface-sage-strong)] rounded-lg cursor-pointer"
            >
              {bn ? 'সব ফসল দেখুন' : 'Show All Crops'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {visiblePosts.map((post) => {
              const commentsVisible = !!openComments[post.id];
              return (
                <article
                  key={post.id}
                  className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl overflow-hidden"
                >
                  <div className="p-6 space-y-4">
                    {/* Author Metadata Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--kb-ink-muted)]">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm text-[var(--kb-ink)]">
                          {bn ? post.authorName.bn : post.authorName.en}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{bn ? post.location.bn : post.location.en}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-[var(--kb-accent)]">
                          {bn ? post.cropLabel.bn : post.cropLabel.en}
                        </span>
                      </div>
                      <span>{bn ? post.timestamp.bn : post.timestamp.en}</span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-[var(--kb-ink)]">
                      {bn ? post.title.bn : post.title.en}
                    </h2>

                    <p className="text-sm sm:text-[15px] text-[var(--kb-ink-muted)] leading-relaxed">
                      {bn ? post.body.bn : post.body.en}
                    </p>

                    {post.imageUrl && (
                      <div className="rounded-xl overflow-hidden border border-[var(--kb-border)] max-h-[340px]">
                        <ResilientImage
                          src={post.imageUrl}
                          alt={bn ? post.title.bn : post.title.en}
                          className="w-full h-full max-h-[340px] object-cover"
                        />
                      </div>
                    )}

                    {/* Sample Expert Advice Box */}
                    <div className="p-4 bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-lg flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-[var(--kb-brand-text)] shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-[var(--kb-brand-text)]">
                          {bn
                            ? 'বিশেষজ্ঞ নমুনা পরামর্শ (Sample Expert Advice)'
                            : 'Sample Expert Advice'}
                        </p>
                        <p className="text-xs sm:text-sm text-[var(--kb-ink)] leading-relaxed">
                          {bn ? post.expertAdvice.bn : post.expertAdvice.en}
                        </p>
                      </div>
                    </div>

                    {/* Like & Comment Action Bar */}
                    <div className="pt-3 border-t border-[var(--kb-border-subtle)] flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => toggleLike(post.id)}
                        className={`inline-flex items-center gap-1.5 min-h-[38px] px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                          post.likedByMe
                            ? 'bg-[var(--kb-surface-sage)] text-[var(--kb-brand-text)] border-[var(--kb-accent)]'
                            : 'bg-[var(--kb-surface-muted)] text-[var(--kb-ink-muted)] border-[var(--kb-border)] hover:text-[var(--kb-ink)]'
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            post.likedByMe ? 'fill-[var(--kb-accent)] text-[var(--kb-accent)]' : ''
                          }`}
                        />
                        <span className="tabular-nums">
                          {post.likes} {bn ? 'পছন্দ' : 'Likes'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleComments(post.id)}
                        className="inline-flex items-center gap-1.5 min-h-[38px] px-3.5 py-1.5 text-xs font-semibold rounded-lg border bg-[var(--kb-surface-muted)] text-[var(--kb-ink-muted)] border-[var(--kb-border)] hover:text-[var(--kb-ink)] transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="tabular-nums">
                          {post.comments.length} {bn ? 'মন্তব্য' : 'Comments'}
                        </span>
                      </button>
                    </div>

                    {/* Comments Section */}
                    {commentsVisible && (
                      <div className="pt-3 space-y-3">
                        {post.comments.length > 0 && (
                          <div className="space-y-2.5">
                            {post.comments.map((com) => (
                              <div
                                key={com.id}
                                className={`p-3.5 rounded-lg border text-sm ${
                                  com.isExpert
                                    ? 'bg-[var(--kb-surface-muted)] border-[var(--kb-accent)]/40'
                                    : 'bg-[var(--kb-surface-muted)] border-[var(--kb-border-subtle)]'
                                }`}
                              >
                                <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-1">
                                  <span className="font-bold text-[var(--kb-ink)]">
                                    {bn ? com.author.bn : com.author.en}
                                    {com.role && (
                                      <span className="text-[var(--kb-accent)] font-semibold ml-1.5">
                                        · {bn ? com.role.bn : com.role.en}
                                      </span>
                                    )}
                                  </span>
                                  <span className="text-[var(--kb-ink-muted)]">
                                    {bn ? com.timestamp.bn : com.timestamp.en}
                                  </span>
                                </div>
                                <p className="text-xs sm:text-sm text-[var(--kb-ink-muted)]">
                                  {bn ? com.text.bn : com.text.en}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        <form
                          onSubmit={(e) => handleAddComment(e, post.id)}
                          className="flex items-center gap-2"
                        >
                          <label htmlFor={`comment-${post.id}`} className="sr-only">
                            {bn ? 'মন্তব্য লিখুন' : 'Write a comment'}
                          </label>
                          <input
                            id={`comment-${post.id}`}
                            type="text"
                            value={commentInputs[post.id] || ''}
                            onChange={(e) =>
                              setCommentInputs((prev) => ({
                                ...prev,
                                [post.id]: e.target.value,
                              }))
                            }
                            placeholder={
                              bn
                                ? 'আপনার মন্তব্য লিখুন...'
                                : 'Write a helpful comment...'
                            }
                            className="flex-1 min-w-0 min-h-[40px] px-3 py-2 text-xs sm:text-sm bg-[var(--kb-surface-muted)] text-[var(--kb-ink)] border border-[var(--kb-border)] rounded-lg"
                          />
                          <button
                            type="submit"
                            className="min-h-[40px] px-4 py-2 text-xs font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>{bn ? 'মন্তব্য' : 'Post'}</span>
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <SourceQualityNotice
          language={language}
          verifiedSource={{
            bn: 'সাধারণ সমন্বিত বালাই ও মাঠ ব্যবস্থাপনা ধারণা (BARI/DAE/১৬১২৩ মাঠ পরামর্শের আদলে)।',
            en: 'Preventive IPM and scouting concepts modeled on DAE / BARI / 16123 extension practices.',
          }}
          demoScope={{
            bn: 'কমিউনিটি পোস্ট, ছবি প্রিভিউ, লাইক, মন্তব্য ও বিশেষজ্ঞ নোট সবই ব্রাউজারভিত্তিক নমুনা ডেমো।',
            en: 'Posts, likes, comments, and sample expert notes run locally in browser storage without a live backend server.',
          }}
        />
      </div>
    </div>
  );
}
