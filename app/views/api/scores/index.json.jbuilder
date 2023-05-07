json.scores @scores do |score|
  json.id score.id
  json.title score.title
  json.is_public score.is_public
end
