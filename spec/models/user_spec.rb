# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  # 有効なファクトリを持つこと
  it 'has a valid factory' do
    expect(FactoryBot.build(:user)).to be_valid
  end

  # providerがなければ無効な状態であること
  it 'is invalid without a provider' do
    user = FactoryBot.build(:user, provider: nil)
    user.valid?
    expect(user.errors[:provider]).to include('Providerを入力してください')
  end

  # uidがなければ無効な状態であること
  it 'is invalid without a uid' do
    user = FactoryBot.build(:user, uid: nil)
    user.valid?
    expect(user.errors[:uid]).to include('Uidを入力してください')
  end

  # nameがなければ無効な状態であること
  it 'is invalid without a name' do
    user = FactoryBot.build(:user, name: nil)
    user.valid?
    expect(user.errors[:name]).to include('Nameを入力してください')
  end

  # image_urlがなければ無効な状態であること
  it 'is invalid without a image_url' do
    user = FactoryBot.build(:user, image_url: nil)
    user.valid?
    expect(user.errors[:image_url]).to include('Image urlを入力してください')
  end

  # uidが重複したユーザーが作成できないこと
  it 'is invalid with a duplicate uid' do
    FactoryBot.create(:user, uid: '1234')
    user = FactoryBot.build(:user, uid: '1234')
    user.valid?
    expect(user.errors[:uid]).to include('はすでに存在します')
  end

  it 'has many fingerings' do
    user = FactoryBot.create(:user, :with_fingerings)
    expect(user.created_fingerings.length).to eq 5
  end
end
