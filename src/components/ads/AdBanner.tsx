'use client';

interface AdBannerProps {
  /**
   * 广告类型
   * banner-300x250: 横幅 300x250 (适合内容区/侧边栏)
   * banner-468x60: 横幅 468x60 (适合内容区顶部/底部)
   * banner-728x90: 横幅 728x90 (适合页面顶部/大屏幕)
   */
  type: 'banner-300x250' | 'banner-468x60' | 'banner-728x90';
  className?: string;
}

const AD_CONFIGS = {
  'banner-300x250': {
    width: 300,
    height: 250,
  },
  'banner-468x60': {
    width: 468,
    height: 60,
  },
  'banner-728x90': {
    width: 728,
    height: 90,
  },
};

export function AdBanner({ type, className = '' }: AdBannerProps) {
  const config = AD_CONFIGS[type];

  return (
    <div className={className}>
      <iframe
        src={`/ads/${type}.html`}
        width={config.width}
        height={config.height}
        style={{ border: 'none', overflow: 'hidden' }}
        title={`Advertisement ${type}`}
      />
    </div>
  );
}
