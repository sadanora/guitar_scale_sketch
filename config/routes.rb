Rails.application.routes.draw do
  constraints host: 'guitar-scale-sketch.fly.dev' do
    get '/(*path)', to: redirect { |path_params,| "https://guitar-scale-sketch.com/#{path_params[:path]}" }
  end

  root 'welcome#index'

  get 'privacy_policy', to: 'welcome#privacy_policy'
  get 'tos', to: 'welcome#tos'
  resources :fingerings
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'logout', to: 'sessions#destroy'
  resource :retirements, only: [:new, :create]
end
