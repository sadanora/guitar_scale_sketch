# frozen_string_literal: true

module MetaTagsHelper
  # rubocop:disable Metrics/MethodLength
  def default_meta_tags
    {
      site: 'Guitar Scale Sketch',
      title: 'Guitar Scale Sketch',
      reverse: true,
      charset: 'utf-8',
      description: '「いま欲しい」ギターの指板図をさっと作れる指板図作成ツール',
      canonical: 'https://guitar-scale-sketch.com/',
      separator: '|',
      og: {
        site_name: 'Guitar Scale Sketch',
        title: 'Guitar Scale Sketch',
        description: '「いま欲しい」ギターの指板図をさっと作れる指板図作成ツール',
        type: 'website',
        url: 'https://guitar-scale-sketch.com/',
        image: image_url('/og_image.png'),
        local: 'ja-JP'
      },
      twitter: {
        card: 'summary_large_image'
      }
    }
  end
  # rubocop:enable Metrics/MethodLength
end
