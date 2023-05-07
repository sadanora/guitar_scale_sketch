# frozen_string_literal: true

class Score < ApplicationRecord
  has_many :fretboards, dependent: :destroy
  validates :title, presence: true
  validates :is_public, inclusion: { in: [true, false] }
end
