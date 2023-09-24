# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Fingering, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.create(:fingering)).to be_valid
  end

  it 'is invalid without a title' do
    fingering = FactoryBot.build(:fingering, title: nil)
    fingering.valid?
    expect(fingering.errors[:title]).to include('タイトルを入力してください')
  end

  it 'is invalid without fingering_code' do
    fingering = FactoryBot.build(:fingering, fingering_code: nil)
    fingering.valid?
    expect(fingering.errors[:fingering_code]).to include('Fingering codeを入力してください')
  end
end
