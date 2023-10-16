# frozen_string_literal: true

class Fingering < ApplicationRecord
  belongs_to :user
  validates :title, length: { maximum: 50 }, presence: true
  validates :fingering_code, presence: true

  self.ignored_columns = [:is_public]

  def created_by?(user)
    return false unless user

    user_id == user.id
  end
end
