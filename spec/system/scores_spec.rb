# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Scores', type: :system, js: true do
  let!(:user) { FactoryBot.create(:user, :with_scores) }
  let!(:other_user) { FactoryBot.create(:user, name: 'Jimi') }
  let!(:public_score) { user.created_scores.first }
  let!(:private_score) { FactoryBot.create(:score, :is_not_public) }

  describe 'Logged-in user' do
    context 'when index' do
      it 'displays their own scores list' do
        sign_in_as(user)
        expect(page).to have_content "#{user.name}'s scale"
      end

      it 'does not display others scores' do
        sign_in_as(user)
        expect(page).to have_content "#{user.name}'s scale"
        visit logout_path
        sign_in_as(other_user)
        expect(page).to have_no_content "#{user.name}'s scale"
      end
    end

    context 'when create' do
      it 'can save a score' do
        sign_in_as(user)
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

    context 'when show' do
      it 'can display their own score' do
        score = user.created_scores.first
        sign_in_as(user)
        within "#score_#{score.id}" do
          click_link 'Show this score'
        end
        expect(page).to have_current_path score_path(score)
        expect(page).to have_selector '.konvajs-content'
      end
    end

    context 'when update' do
      it 'can update a score' do
        sign_in_as(user)
        score = user.created_scores.first
        visit scores_path
        within "#score_#{score.id}" do
          click_link 'Show this score'
        end
        click_link 'Edit this score'
        select '3', from: 'Startfret'
        select '8', from: 'Endfret'
        click_button 'Add'
        click_button '更新する'
        expect(page).to have_content 'Score was successfully updated.'
      end
    end

    context 'when destroy' do
      it 'can delete a score' do
        sign_in_as(user)
        score = user.created_scores.first
        visit scores_path
        within "#score_#{score.id}" do
          click_link 'Show this score'
        end

        expect do
          page.accept_confirm do
            click_link 'Destroy this score'
          end
          expect(page).to have_content 'Score was successfully destroyed.'
        end.to change(Score, :count).by(-1)
      end
    end
  end

  describe 'Non logged-in user' do
    context 'when index' do
      it 'cannot access' do
        visit scores_path
        expect(page).to have_content 'ログインしてください'
      end
    end

    context 'when create' do
      it 'cannot save a score' do
        visit root_path
        click_on 'ログインせずに指板図をつくる'
        fill_in 'タイトル', with: 'Test Score'
        select '1', from: 'Startfret'
        select '5', from: 'Endfret'
        click_button '登録する'
        expect(page).to have_content 'ログインしてください'
      end
    end

    context 'when show' do
      it 'can display public scores' do
        expect(public_score.is_public).to be true
        visit score_path(public_score)
        expect(page).to have_selector '.konvajs-content'
      end

      it 'does not display private scores' do
        visit score_path(private_score)
        expect(private_score.is_public).to be false
        expect(page).to have_content '非公開の指板図です'
      end
    end

    context 'when edit' do
      it 'does not display edit button' do
        visit score_path(public_score)
        expect(page).to have_no_content 'Edit this score'
      end
    end

    context 'when destroy' do
      it 'does not display destroy button' do
        visit score_path(public_score)
        expect(page).to have_no_content 'Destroy this score'
      end
    end
  end
end
