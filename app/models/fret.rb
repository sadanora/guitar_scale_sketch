# frozen_string_literal: true

class Fret < ApplicationRecord
  belongs_to :fretboard
  validates :fret_number, :E1, :B2, :G3, :D4, :A5, :E6, presence: true
end
