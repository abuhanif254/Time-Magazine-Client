type Props = {
  title: string;
};

function buildShareUrls(title: string) {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return {
    x: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
  };
}

export default function ShareButtons({ title }: Props) {
  const urls = buildShareUrls(title);

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator
        .share({ title, url: window.location.href })
        .catch(() => {
          // ignore
        });
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="font-semibold text-gray-600">Share:</span>
      <a
        href={urls.x}
        target="_blank"
        rel="noreferrer"
        className="rounded-full border border-gray-300 px-2 py-1 font-semibold text-gray-800 hover:bg-gray-100"
      >
        X
      </a>
      <a
        href={urls.facebook}
        target="_blank"
        rel="noreferrer"
        className="rounded-full border border-gray-300 px-2 py-1 font-semibold text-gray-800 hover:bg-gray-100"
      >
        Facebook
      </a>
      <a
        href={urls.linkedin}
        target="_blank"
        rel="noreferrer"
        className="rounded-full border border-gray-300 px-2 py-1 font-semibold text-gray-800 hover:bg-gray-100"
      >
        LinkedIn
      </a>
      {'share' in navigator ? (
        <button
          type="button"
          onClick={handleNativeShare}
          className="rounded-full border border-gray-300 px-2 py-1 font-semibold text-gray-800 hover:bg-gray-100"
        >
          System
        </button>
      ) : null}
    </div>
  );
}

