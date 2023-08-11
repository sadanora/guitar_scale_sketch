Rails.application.routes.draw do
  resources :scores
  get 'auth/:provider/callback', to: 'sessions#create'
  get "logout", to: 'sessions#destroy'

  root to: redirect("/scores")
end
