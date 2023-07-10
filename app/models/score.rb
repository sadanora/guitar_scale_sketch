# frozen_string_literal: true

class Score < ApplicationRecord
  validates :title, presence: true
  validates :score_code, presence: true
end
