# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Fingering, type: :model do
  let!(:fingering) { FactoryBot.create(:fingering) }

  describe '#created_by?' do
    it 'return true created user' do
      created_user = fingering.user
      expect(fingering.created_by?(created_user)).to be true
    end

    it 'return false not created user' do
      not_created_user = FactoryBot.create(:user)
      expect(fingering.created_by?(not_created_user)).to be false
    end

    it 'return false unless user' do
      fingering = FactoryBot.create(:fingering)
      expect(fingering.created_by?(nil)).to be false
    end
  end
end
