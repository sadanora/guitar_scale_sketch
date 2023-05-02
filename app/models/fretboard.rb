class Fretboard < ApplicationRecord
  belongs_to :score
  has_many :dots, dependent: :destroy
  validates :position, :start_fret, :end_fret, presence: true
end
