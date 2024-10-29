import os

# Specify the name of the output file
output_file = 'merged.js'

# Open the output file in write mode
with open(output_file, 'w') as outfile:
    # Walk through the directory tree
    for root, dirs, files in os.walk('.'):
        for filename in files:
            # Check if the file has a .js extension
            if filename.endswith('.js'):
                file_path = os.path.join(root, filename)
                # Open the .js file and read its content
                with open(file_path, 'r') as infile:
                    outfile.write(f'// Content from {file_path}\n')
                    outfile.write(infile.read() + '\n')
                    outfile.write('\n')  # Add a newline for separation

print(f'All .js files have been merged into {output_file}')
