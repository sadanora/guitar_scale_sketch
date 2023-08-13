# frozen_string_literal: true

class Score < ApplicationRecord
  validates :title, length: { maximum: 50 }, presence: true
  validates :score_code, presence: true
  validates :is_public, presence: true
end
