# frozen_string_literal: true

class User < ApplicationRecord
  has_many :created_fingerings, class_name: 'Fingering', dependent: :destroy

  validates :provider, presence: true
  validates :uid, presence: true
  validates :name, presence: true
  validates :image_url, presence: true

  validates :uid, uniqueness: { scope: :provider }

  def self.find_or_create_from_auth_hash!(auth_hash)
    provider = auth_hash[:provider]
    uid = auth_hash[:uid]
    name = auth_hash[:info][:name]
    image_url = auth_hash[:info][:image]

    User.find_or_create_by!(provider:, uid:) do |user|
      user.name = name
      user.image_url = image_url
    end
  end
end
