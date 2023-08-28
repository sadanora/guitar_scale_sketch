# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Scores', type: :system do
  it 'can be created by logged_in user', js: true do
    user = FactoryBot.create(:user, :with_scores)

    sign_in_as(user)
    expect(page).to have_content 'ログインしました'

    expect do
      click_on '指板図をつくる'
      fill_in 'タイトル', with: 'Test Score'
      select '1', from: 'Startfret'
      select '5', from: 'Endfret'
      click_button 'Add'
      select '2', from: 'Startfret'
      select '4', from: 'Endfret'
      click_button 'Add'
      click_button '登録する'
      expect(page).to have_content 'Score was successfully created.'
    end.to change(Score, :count).by(1)
  end
end
