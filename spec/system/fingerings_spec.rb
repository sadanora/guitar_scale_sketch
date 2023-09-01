# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Fingerings', type: :system, js: true do
  let!(:user) { FactoryBot.create(:user, :with_fingerings) }
  let!(:other_user) { FactoryBot.create(:user, name: 'Jimi') }
  let!(:public_fingering) { user.created_fingerings.first }
  let!(:private_fingering) { FactoryBot.create(:fingering, :is_not_public) }

  describe 'Logged-in user' do
    context 'when index' do
      it 'displays their own fingerings list' do
        sign_in_as(user)
        expect(page).to have_content "#{user.name}'s scale"
      end

      it 'does not display others fingerings' do
        sign_in_as(user)
        expect(page).to have_content "#{user.name}'s scale"
        visit logout_path
        sign_in_as(other_user)
        expect(page).to have_no_content "#{user.name}'s scale"
      end
    end

    context 'when create' do
      it 'can save a fingering' do
        sign_in_as(user)
        expect do
          click_on '指板図をつくる'
          fill_in 'タイトル', with: 'Test Fingering'
          select '1', from: 'Startfret'
          select '5', from: 'Endfret'
          click_button 'Add'
          select '2', from: 'Startfret'
          select '4', from: 'Endfret'
          click_button 'Add'
          click_button '登録する'
          expect(page).to have_content 'Fingering was successfully created.'
        end.to change(Fingering, :count).by(1)
      end
    end

    context 'when show' do
      it 'can display their own fingering' do
        fingering = user.created_fingerings.first
        sign_in_as(user)
        within "#fingering_#{fingering.id}" do
          click_link 'Show this fingering'
        end
        expect(page).to have_current_path fingering_path(fingering)
        expect(page).to have_selector '.konvajs-content'
      end
    end

    context 'when update' do
      it 'can update a fingering' do
        sign_in_as(user)
        fingering = user.created_fingerings.first
        visit fingerings_path
        within "#fingering_#{fingering.id}" do
          click_link 'Show this fingering'
        end
        click_link 'Edit this fingering'
        select '3', from: 'Startfret'
        select '8', from: 'Endfret'
        click_button 'Add'
        click_button '更新する'
        expect(page).to have_content 'Fingering was successfully updated.'
      end
    end

    context 'when destroy' do
      it 'can delete a fingering' do
        sign_in_as(user)
        fingering = user.created_fingerings.first
        visit fingerings_path
        within "#fingering_#{fingering.id}" do
          click_link 'Show this fingering'
        end

        expect do
          page.accept_confirm do
            click_link 'Destroy this fingering'
          end
          expect(page).to have_content 'Fingering was successfully destroyed.'
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
        fill_in 'タイトル', with: 'Test fingering'
        select '1', from: 'Startfret'
        select '5', from: 'Endfret'
        click_button '登録する'
        expect(page).to have_content 'ログインしてください'
      end
    end

    context 'when show' do
      it 'can display public fingerings' do
        expect(public_fingering.is_public).to be true
        visit fingering_path(public_fingering)
        expect(page).to have_selector '.konvajs-content'
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
        expect(page).to have_no_content 'Edit this fingering'
      end
    end

    context 'when destroy' do
      it 'does not display destroy button' do
        visit fingering_path(public_fingering)
        expect(page).to have_no_content 'Destroy this fingering'
      end
    end
  end
end
