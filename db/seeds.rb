require 'active_record/fixtures'

tables = %i[
  scores
  fretboards
  dots
]

ActiveRecord::FixtureSet.create_fixtures 'db/fixtures', tables
