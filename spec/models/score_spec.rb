# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Score, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.create(:score)).to be_valid
  end

  it 'is invalid without a title' do
    score = FactoryBot.build(:score, title: nil)
    score.valid?
    expect(score.errors[:title]).to include('を入力してください')
  end

  it 'is invalid without score_code' do
    score = FactoryBot.build(:score, score_code: nil)
    score.valid?
    expect(score.errors[:score_code]).to include('を入力してください')
  end
end
