import tensorflow as tf

# Load the SavedModel (using TensorFlow)
saved_model_path = './models/skin_model'  # Path to the SavedModel directory
model = tf.saved_model.load(saved_model_path)

# Save the model in H5 format
h5_model_path = './models/skin_model.h5'  # Path where the .h5 file will be saved
model = model.signatures['serving_default']  # Ensure the model has a signature to be used in the correct way

# Convert model to Keras model and save as .h5
keras_model = tf.keras.models.Model(inputs=model.inputs, outputs=model.outputs)
keras_model.save(h5_model_path)

print(f"Model successfully converted and saved as {h5_model_path}")




