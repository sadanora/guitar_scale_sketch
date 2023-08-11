# frozen_string_literal: true

class ApplicationController < ActionController::Base
  helper_method %i[logged_in? current_user]

  private

  def logged_in?
    !!session[:user_id]
  end

  def current_user
    User.find(session[:user_id]) if session[:user_id]
  end
end
