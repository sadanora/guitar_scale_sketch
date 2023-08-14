Rails.application.routes.draw do
  get 'welcome/index'
  resources :scores
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'logout', to: 'sessions#destroy'

  root 'welcome#index'
end
