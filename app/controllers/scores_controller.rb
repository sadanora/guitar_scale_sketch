# frozen_string_literal: true

class ScoresController < ApplicationController
  before_action :set_score, only: %i[show edit update destroy]
  skip_before_action :authenticate, only: %i[new show]

  # GET /scores or /scores.json
  def index
    @scores = current_user.created_scores.order(updated_at: :desc).page(params[:page])
  end

  # GET /scores/1 or /scores/1.json
  def show; end

  # GET /scores/new
  def new
    @score = Score.new
  end

  # GET /scores/1/edit
  def edit; end

  # POST /scores or /scores.json
  def create
    @score = current_user.created_scores.build(score_params)
    if @score.save
      redirect_to @score, notice: 'Score was successfully created.'
    end
  end

  # PATCH/PUT /scores/1 or /scores/1.json
  def update
    respond_to do |format|
      if @score.update(score_params)
        format.html { redirect_to score_url(@score), notice: 'Score was successfully updated.' }
        format.json { render :show, status: :ok, location: @score }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @score.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /scores/1 or /scores/1.json
  def destroy
    @score.destroy

    respond_to do |format|
      format.html { redirect_to scores_url, notice: 'Score was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_score
    @score = Score.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def score_params
    params.require(:score).permit(:id, :title, :is_public, :score_code)
  end
end
