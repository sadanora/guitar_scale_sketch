# frozen_string_literal: true

class ScoresController < ApplicationController
  skip_before_action :authenticate, only: %i[new show]
  before_action :set_score, only: %i[show]
  before_action :set_my_score, only: %i[edit update destroy]

  def index
    @scores = current_user.created_scores.order(updated_at: :desc).page(params[:page])
  end

  def show; end

  def new
    @score = Score.new
  end

  def edit; end

  def create
    @score = current_user.created_scores.build(score_params)
    if @score.save
      redirect_to @score, notice: 'Score was successfully created.'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def update
    if @score.update(score_params)
      redirect_to @score, notice: 'Score was successfully updated.'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @score.destroy!

    redirect_to scores_url, notice: 'Score was successfully destroyed.'
  end

  private

  def set_score
    @score = Score.find(params[:id])
  end

  def set_my_score
    @score = current_user.created_scores.find(params[:id])
  end

  def score_params
    params.require(:score).permit(:id, :title, :is_public, :score_code)
  end
end
