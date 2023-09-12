# frozen_string_literal: true

FactoryBot.define do
  factory :fingering do
    sequence(:title) { |n| "#{user.name}'s scale #{n}" }
    is_public { true }
    fingering_code { '[{"position":1,"startFret":1,"endFret":7,"dots":[{"fill":"#C7243A","fret":1,"guitarString":1}]}]' }
    association :user

    trait :is_not_public do
      is_public { false }
    end
  end
end