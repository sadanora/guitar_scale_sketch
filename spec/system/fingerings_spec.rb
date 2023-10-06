# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Fingerings', type: :system, js: true do
  let!(:user) { create(:user, :with_fingerings) }
  let!(:other_user) { create(:user, name: 'Jimi') }
  let!(:public_fingering) { user.created_fingerings.first }
  let!(:private_fingering) { create(:fingering, :is_not_public) }

  describe 'Logged-in user' do
    context 'when index' do
      it 'displays their own fingerings list' do
        sign_in_as(user)
        visit fingerings_path
        expect(page).to have_content "#{user.name}'s scale"
      end

      it 'does not display others fingerings' do
        sign_in_as(user)
        visit fingerings_path
        expect(page).to have_content "#{user.name}'s scale"
        visit logout_path
        sign_in_as(other_user)
        visit fingerings_path
        expect(page).to have_no_content "#{user.name}'s scale"
      end
    end

    context 'when create' do
      it 'can save a fingering' do
        sign_in_as(user)
        expect do
          click_on '指板図をつくる'
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
        sign_in_as(user)
        click_on '指板図をつくる'
        fill_in 'タイトル', with: 'Test Fingering'
        select '10', from: '開始フレット'
        expect(page).to have_content '終端フレットは開始フレット以上の値にしてください'
      end

      it 'can not add fretboard if the fretboard width over 12 frets' do
        sign_in_as(user)
        click_on '指板図をつくる'
        fill_in 'タイトル', with: 'Test Fingering'
        select '13', from: '終端フレット'
        expect(page).to have_content '指板の幅は12フレット以下にしてください'
      end
    end

    context 'when show' do
      it 'can display their own fingering' do
        fingering = user.created_fingerings.first
        sign_in_as(user)
        visit fingerings_path
        within "#fingering_#{fingering.id}" do
          click_link fingering.title.to_s
        end
        expect(page).to have_current_path fingering_path(fingering)
        expect(page).to have_selector '.konvajs-content'
      end

      it 'does not display edit link for others fingerings' do
        sign_in_as(other_user)
        visit fingering_path(public_fingering)
        expect(page).to have_no_content '編集'
      end

      it 'does not display destroy link for others fingerings' do
        sign_in_as(other_user)
        visit fingering_path(public_fingering)
        expect(page).to have_no_content '削除'
      end
    end

    context 'when update' do
      it 'can update a fingering' do
        sign_in_as(user)
        fingering = user.created_fingerings.first
        visit fingerings_path
        within "#fingering_#{fingering.id}" do
          click_link fingering.title.to_s
        end
        click_link '編集'
        select '3', from: '開始フレット'
        select '8', from: '終端フレット'
        click_button '指板を追加'
        click_button '更新する'
        expect(page).to have_content '指板図を更新しました。'
      end
    end

    context 'when destroy' do
      it 'can delete a fingering' do
        sign_in_as(user)
        fingering = user.created_fingerings.first
        visit fingerings_path
        within "#fingering_#{fingering.id}" do
          click_link fingering.title.to_s
        end

        expect do
          page.accept_confirm do
            click_link '削除'
          end
          expect(page).to have_content '指板図を削除しました。'
        end.to change(Fingering, :count).by(-1)
      end
    end
  end

  describe 'Non logged-in user' do
    context 'when index' do
      it 'cannot access' do
        visit fingerings_path
        expect(page).to have_content 'ログインしてください'
      end
    end

    context 'when create' do
      it 'cannot save a fingering' do
        visit root_path
        click_on 'ログインせずに指板図をつくる'
        expect(page).to have_no_content '登録する'
      end
    end

    context 'when show' do
      it 'can display public fingerings' do
        expect(public_fingering.is_public).to be true
        visit fingering_path(public_fingering)
        expect(page).to have_selector '.konvajs-content'
        expect(page).to have_no_content '一覧へ戻る'
      end

      it 'does not display private fingerings' do
        visit fingering_path(private_fingering)
        expect(private_fingering.is_public).to be false
        expect(page).to have_content '非公開の指板図です'
      end
    end

    context 'when edit' do
      it 'does not display edit button' do
        visit fingering_path(public_fingering)
        expect(page).to have_no_content '編集'
      end
    end

    context 'when destroy' do
      it 'does not display destroy button' do
        visit fingering_path(public_fingering)
        expect(page).to have_no_content '削除'
      end
    end
  end
end
