require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module FretboardDiagramsGenerator
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # タイムゾーンをTokyo（日本）にする
    config.time_zone = "Tokyo"
    # デフォルトのロケールを日本にする
    config.i18n.default_locale = :ja
  end
end
