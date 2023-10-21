# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Fingerings', type: :system, js: true do
  let!(:user) { create(:user, :with_fingerings) }
  let!(:fingering) { user.created_fingerings.first }
  let!(:other_user) { create(:user, name: 'Jimi') }
  let!(:other_users_fingering) { create(:fingering, user: other_user) }

  describe 'For a logged-in user' do
    before { sign_in_as(user) }

    context 'when on the index page' do
      before { visit fingerings_path }

      it 'displays their own fingerings' do
        expect(page).to have_content "#{user.name}'s scale"
      end

      it 'does not display others fingerings' do
        visit logout_path
        sign_in_as(other_user)
        visit fingerings_path
        expect(page).to have_no_content "#{user.name}'s scale"
      end
    end

    context 'when on the create page' do
      before do
        visit root_path
        click_on '指板図をつくる'
      end

      it 'can save a fingering' do
        expect do
          fill_in 'タイトル', with: 'Test Fingering'
          select '1', from: '開始フレット'
          select '5', from: '終端フレット'
          click_button '指板を追加'
          select '2', from: '開始フレット'
          select '4', from: '終端フレット'
          click_button '指板を追加'
          click_button '登録する'
          expect(page).to have_content '指板図を作成しました。'
        end.to change(Fingering, :count).by(1)
      end

      it 'can not add fretboard if endFret value is less than startFret' do
        fill_in 'タイトル', with: 'Test Fingering'
        select '10', from: '開始フレット'
        expect(page).to have_content '終端フレットは開始フレット以上の値にしてください'
      end

      it 'can not add fretboard if the fretboard width exceeds 12 frets' do
        fill_in 'タイトル', with: 'Test Fingering'
        select '13', from: '終端フレット'
        expect(page).to have_content '指板の幅は12フレット以下にしてください'
      end
    end

    context 'when on their own fingering show page' do
      before do
        visit fingerings_path
        within "#fingering_#{fingering.id}" do
          click_link fingering.title.to_s
        end
      end

      it 'can display fingering' do
        expect(page).to have_current_path fingering_path(fingering)
        expect(page).to have_selector '.konvajs-content'
      end

      it 'can update a fingering' do
        click_link '編集'
        select '3', from: '開始フレット'
        select '8', from: '終端フレット'
        click_button '指板を追加'
        click_button '更新する'
        expect(page).to have_content '指板図を更新しました。'
      end

      it 'can delete fingering' do
        expect do
          page.accept_confirm do
            click_link '削除'
          end
          expect(page).to have_content '指板図を削除しました。'
        end.to change(Fingering, :count).by(-1)
      end
    end

    context 'when on other users fingering show page' do
      before { visit fingering_path(other_users_fingering) }

      it 'does not display edit link' do
        expect(page).to have_no_content '編集'
      end

      it 'does not display delete link' do
        expect(page).to have_no_content '削除'
      end
    end
  end

  describe 'For a non logged-in user' do
    context 'when on the index page' do
      it 'cannot access' do
        visit fingerings_path
        expect(page).to have_content 'ログインしてください'
      end
    end

    context 'when on the create page' do
      it 'cannot save a fingering' do
        visit root_path
        click_on 'ログインせずに指板図をつくる'
        expect(page).to have_no_content '登録する'
      end
    end

    context 'when on the show page' do
      before { visit fingering_path(fingering) }

      it 'can display fingerings' do
        expect(page).to have_selector '.konvajs-content'
        expect(page).to have_no_content '一覧へ戻る'
      end

      it 'does not display edit link' do
        expect(page).to have_no_content '編集'
      end

      it 'does not display delete link' do
        expect(page).to have_no_content '削除'
      end
    end
  end
end
