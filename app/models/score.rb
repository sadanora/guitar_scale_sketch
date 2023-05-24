# frozen_string_literal: true

class Score < ApplicationRecord
  validates :title, presence: true
  validates :is_public, presence: true
  validates :score_code, presence: true
end
