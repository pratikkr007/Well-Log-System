import lasio

def parse_las(file_path):
    las = lasio.read(file_path)

    # Convert to DataFrame
    df = las.df().copy().reset_index()


    # Rename first column safely to "depth"
    depth_column = df.columns[0]
    df.rename(columns={depth_column: "depth"}, inplace=True)

    # Drop rows with all NaN
    df = df.dropna(how="all")

    # Extract curve names safely
    curves = [col for col in df.columns if col != "depth"]

    return df, curves
