# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  it 'has many fingerings' do
    user = FactoryBot.create(:user, :with_fingerings)
    expect(user.created_fingerings.length).to eq 5
  end
end
