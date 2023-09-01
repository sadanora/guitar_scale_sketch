Rails.application.routes.draw do
  get 'welcome/index'
  get 'privacy_policy', to: 'welcome#privacy_policy'
  get 'tos', to: 'welcome#tos'
  resources :fingerings
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'logout', to: 'sessions#destroy'
  resource :retirements

  root 'welcome#index'
end
