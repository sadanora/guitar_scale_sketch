json.scores @scores do |score|
  json.id score.id
  json.title score.title
  json.isPublic score.is_public
end
