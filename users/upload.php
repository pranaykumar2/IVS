<?php

if(isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $tempFile = $_FILES['file']['tmp_name'];
    $fileName = $_FILES['file']['name'];
    $targetFile = __DIR__ . '/' . $fileName;

    if(move_uploaded_file($tempFile, $targetFile)) {
        $copyDirectory = '../admin/';

        $copyTargetFile = $copyDirectory . $fileName;

        if(copy($targetFile, $copyTargetFile)) {
            if(unlink($targetFile)) {
                echo json_encode(array('status' => 'success', 'message' => 'File uploaded, copied, and deleted successfully.'));
            } else {
                echo json_encode(array('status' => 'error', 'message' => 'Failed to delete uploaded file.'));
            }
        } else {
            echo json_encode(array('status' => 'error', 'message' => 'Failed to copy uploaded file.'));
        }
    } else {
        echo json_encode(array('status' => 'error', 'message' => 'Failed to move uploaded file.'));
    }
} else {
    echo json_encode(array('status' => 'error', 'message' => 'File upload failed.'));
}
?>
