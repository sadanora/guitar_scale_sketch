require 'rails_helper'

RSpec.describe User, type: :model do
  # provider、uid、name、image_urlがあれば有効な状態であること
  it "is valid with a provider, uid, name, and image_url" do
    user = User.new(
      provider: "google_oauth2",
      uid: "123456789123456789123",
      name: "Ritchie",
      image_url: "http://example.com/image1.jpg",
    )
    expect(user).to be_valid
  end
  # providerがなければ無効な状態であること
  it "is invalid without a provider" do
    user = User.new(provider: nil)
    user.valid?
    expect(user.errors[:provider]).to include("を入力してください")
  end
  # uidがなければ無効な状態であること
  it "is invalid without a uid" do
    user = User.new(uid: nil)
    user.valid?
    expect(user.errors[:uid]).to include("を入力してください")
  end
  # nameがなければ無効な状態であること
  it "is invalid without a name" do
    user = User.new(name: nil)
    user.valid?
    expect(user.errors[:name]).to include("を入力してください")
  end
  # image_urlがなければ無効な状態であること
  it "is invalid without a image_url" do
    user = User.new(image_url: nil)
    user.valid?
    expect(user.errors[:image_url]).to include("を入力してください")
  end

  it 'is invalid with a duplicate uid and provider' do
    User.create(
      provider: "google_oauth2",
      uid: "123456789123456789123",
      name: "Ritchie",
      image_url: "http://example.com/image1.jpg",
    )
    user = User.new(
      provider: "google_oauth2",
      uid: "123456789123456789123",
      name: "Beefheart",
      image_url: "http://example.com/image2.jpg",
    )

    user.valid?
    expect(user.errors[:uid]).to include('はすでに存在します')
  end
end
