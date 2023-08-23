FactoryBot.define do
  factory :score do
    sequence(:title) { |n| "test scale #{n}"}
    is_public { true }
    score_code { "[{\"position\":1,\"startFret\":1,\"endFret\":7,\"dots\":[{\"fill\":\"#C7243A\",\"fret\":1,\"guitarString\":1}]}]"}
    association :user

    trait :is_not_public do
      is_public { false }
    end
  end
end
