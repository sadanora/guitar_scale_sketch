class Fretboard < ApplicationRecord
  belongs_to :score
  has_many :frets, dependent: :destroy
  validates :position, :start_fret, :end_fret, presence: true
end
