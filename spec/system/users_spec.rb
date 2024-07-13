# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Users', :js, type: :system do
  let!(:user) { create(:user) }
  let!(:user_with_fingerings) { create(:user, :with_fingerings) }

  it 'can login' do
    sign_in_as(user)
    expect(page).to have_content 'ログインしました'
  end

  it 'can logout' do
    sign_in_as(user)
    find('.dropdown').click
    click_on 'ログアウト'
    expect(page).to have_content 'ログアウトしました'
  end

  it 'can retirement' do
    sign_in_as(user_with_fingerings)
    find('.dropdown').click
    click_on '退会'
    expect do
      page.accept_confirm do
        click_link '退会する'
      end
      expect(page).to have_content '退会完了しました。'
    end.to change(User, :count).by(-1).and change(Fingering, :count).by(-5)
  end
end
