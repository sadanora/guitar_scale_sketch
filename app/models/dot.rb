class Dot < ApplicationRecord
  belongs_to :fretboard
  validates :fret, :string, :color, presence: true
end
