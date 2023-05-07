# frozen_string_literal: true

class Api::ScoresController < ApplicationController
  before_action :set_score, only: %i[show update destroy]
  before_action :snakeize_params, only: %i[create update]

  def index
    @scores = Score.all
  end

  def show; end

  def create
    @score = Score.new(score_params)

    if @score.save
      render json: @score, status: :created
    else
      render json: @score.errors, status: :unprocessable_entity
    end
  end

  def update
    if @score.update(score_params)
      render json: @score, status: :ok
    else
      render json: @score.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @score.destroy
  end

  private

  def set_score
    @score = Score.find(params[:id])
  end

  def score_params
    params.require(:score).permit(
      :title,
      :is_public
    )
  end
end
