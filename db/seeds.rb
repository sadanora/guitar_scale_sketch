# frozen_string_literal: true

require 'active_record/fixtures'

tables = %i[
  scores
  fretboards
  frets
]

ActiveRecord::FixtureSet.create_fixtures 'db/fixtures', tables
