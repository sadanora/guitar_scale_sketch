# Transform JSON request param keys from JSON-conventional camelCase to
# Rails-conventional snake_case
module ActionController
  # Modified from action_controller/metal/strong_parameters.rb
  class Parameters
    def deep_snakeize!
      @parameters.deep_transform_keys!(&:underscore)
      self
    end
  end
end
