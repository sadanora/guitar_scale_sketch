# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe '.find_or_create_from_auth_hash!' do
    it 'find valid user' do
      user = create(:user)
      auth_hash = {
        provider: user.provider,
        uid: user.uid,
        info: {
          name: user.name,
          image: user.image_url
        }
      }
      expect(described_class.find_or_create_from_auth_hash!(auth_hash)).to eq user
    end
  end
end
