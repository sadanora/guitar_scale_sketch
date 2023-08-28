# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    provider { 'google_oauth2' }
    sequence(:uid) { |n| "123456789123456789123#{n}" }
    name { 'Ritchie' }
    image_url { 'http://example.com/image1.jpg' }

    trait :with_scores do
      after(:create) { |user| create_list(:score, 5, user:) }
    end
  end
end
