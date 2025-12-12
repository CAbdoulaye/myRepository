-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 12, 2025 at 12:24 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `capture_the_flag`
--

-- --------------------------------------------------------

--
-- Table structure for table `challenges`
--

CREATE TABLE `challenges` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `difficulty` varchar(50) NOT NULL,
  `flag` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `challenges`
--

INSERT INTO `challenges` (`id`, `title`, `description`, `difficulty`, `flag`, `created_at`) VALUES
(2, 'Hash Me If You Can', 'wrap your answer in FLAG{}: MD5 hash: 5f4dcc3b5aa765d61d8327deb882cf99', 'easy', 'FLAG{password}', '2025-12-10 19:04:23'),
(3, 'Encoded Secrets', 'Base64 encoded: RkxBR3tiYXNlNjRfZnVuX2VudHJ5fQ==', 'medium', 'FLAG{base64_fun_entry}', '2025-12-10 19:04:23'),
-- (4, 'SQL Sleuthing', 'Basic SQL challenge description.', 'medium', 'FLAG{sql_master}', '2025-12-10 19:04:23'),
(9, 'Reverse Me', 'Reverse this string to get the flag:\n\"}gflaf_eht_timbus{FTC\"', 'easy', 'CTF{submit_the_flag}', '2025-12-11 03:19:46'),
(10, 'Basic Math Challenge', 'Solve: 128 + 54 + 100\nThe result wrapped in CTF{} is the flag.', 'easy', 'CTF{282}', '2025-12-11 03:20:14'),
(11, 'Riddle: I Speak Without a Mouth', 'What am I?\nWrap your answer in CTF{}', 'medium', 'CTF{echo}', '2025-12-11 03:20:34'),
(12, 'Caesar Shift', 'Decode this caesar-shifted text (shift 3): iodj{fdhvdushg}', 'medium', 'flag{caesarred}', '2025-12-11 03:20:52'),
(13, 'Spot the Flag', 'The flag is hidden inside this text:\nHello this is not a flag but check this: CTF{you_found_me} ok continue', 'easy', 'CTF{you_found_me}', '2025-12-11 03:21:18'),
(16, 'Binary Flip', 'Convert this binary to text and wrap your answer in CTF{}: 01000011 01010100 01000110', 'easy', 'CTF{CTF}', '2025-12-11 20:24:43'),
(17, 'Base64 Decode', 'Decode this Base64 string and wrap your answer in CTF{}: Q1RGe2Jhc2U2NF9mdW59', 'easy', 'CTF{base64_fun}', '2025-12-11 20:24:43'),
(18, 'Hidden Word', 'Find the hidden word in this sentence and wrap your answer in CTF{}: The Quick Orange Fox Runs Swiftly.', 'easy', 'CTF{QOFRS}', '2025-12-11 20:24:43'),
(19, 'Reverse Me 2', 'Reverse this string and wrap your answer in CTF{}: \"}11d_nw0d_3t1w{FTC\"', 'easy', 'CTF{w1t3d_0wn_d11}', '2025-12-11 20:24:43'),
(20, 'Simple MD5', 'Compute the MD5 hash of the word \"puzzle\" and wrap your answer in CTF{}.', 'medium', 'CTF{0a113ef6b61820daa5611c870ed8d5ee}', '2025-12-11 20:24:43'),
(21, 'Caesar Cipher 2', 'Decode this Caesar shift (shift 5) and wrap your answer in CTF{}: hfjxfw_jshwduynsl', 'medium', 'CTF{caesar_challenge}', '2025-12-11 20:24:43'),
(22, 'Riddle: Time', 'I am always moving but never leave my spot. What am I? Wrap your answer in CTF{}.', 'medium', 'CTF{clock}', '2025-12-11 20:24:43'),
(23, 'Hex Decode', 'Decode this hex string and wrap your answer in CTF{}: 43 54 46 7b 6865785f70726f7d', 'medium', 'CTF{hex_pro}', '2025-12-11 20:24:43'),
(24, 'SQL Injection Basic', 'Provide the classic SQL injection bypass string and wrap your answer in CTF{}.', 'hard', 'CTF{\' OR 1=1 -- }', '2025-12-11 20:24:43'),
(25, 'Forensics Log', 'The attacker used a specific port. What port is commonly used for SSH? Wrap your answer in CTF{}.', 'hard', 'CTF{22}', '2025-12-11 20:24:43');

-- --------------------------------------------------------

--
-- Table structure for table `submissions`
--

CREATE TABLE `submissions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `challenge_id` int(11) NOT NULL,
  `submitted_flag` varchar(50) NOT NULL,
  `is_correct` tinyint(4) NOT NULL,
  `submitted_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `submissions`
--

INSERT INTO `submissions` (`id`, `user_id`, `challenge_id`, `submitted_flag`, `is_correct`, `submitted_at`) VALUES
(5, 1, 1, 'FLAG{easy_challenge}', 1, '2025-12-10 20:32:52'),
(6, 5, 6, '21', 1, '2025-12-10 20:44:53'),
(7, 5, 1, 'dc', 0, '2025-12-10 20:55:07'),
(8, 2, 2, 'not sure', 0, '2025-12-11 03:09:52'),
(9, 1, 9, 'CTF{submit_the_flag}', 1, '2025-12-11 03:23:46'),
(10, 1, 10, 'CTF{282}', 1, '2025-12-11 03:24:50'),
(11, 2, 10, 'CTF{282}', 1, '2025-12-11 03:40:35'),
(12, 6, 10, 'CTF{282}', 1, '2025-12-11 20:16:33'),
(13, 6, 23, 'CTF{hex_pro}', 1, '2025-12-11 20:25:42'),
(14, 7, 10, 'CTF{282}', 1, '2025-12-11 20:38:40');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `role` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'John', 'Doe', 'john@example.com', '12345678', 'user', '2025-12-10 05:36:30'),
(2, 'Cheikh', 'Faye', 'cheikh1abdoulaye@gmail.com', 'cheikh1abdoulaye@gmail.com', 'user', '2025-12-10 18:23:06'),
(3, 'Testting', 'Testting', 'Testting@gmail.com', 'Testting', 'user', '2025-12-10 18:35:00'),
(4, 'Test2', 'Test2', 'Test2@gmail.com', 'Test2', 'user', '2025-12-10 18:55:57'),
(5, 'admin', 'admin', 'admin@gmail.com', 'admin', 'admin', '2025-12-10 20:43:02'),
(6, 'Mike ', 'Tyson', 'Mike@gmail.com', 'Mike@gmail.com', 'user', '2025-12-11 20:16:09'),
(7, 'Khadija', 'Faye', 'Khadija@gmail.com', 'Khadija@gmail.com', 'user', '2025-12-11 20:38:12'),
(8, 'fs', 'sf', 'wfe', 'ewr', 'user', '2025-12-11 22:05:51'),
(9, 'John', 'Craig', 'John@gmail.com', '$2b$10$MvxlFgTGsQPVmSLxnXIi4uyYlOo6.sgRReqAKee8qM2Ml6JtCybee', 'user', '2025-12-11 22:12:25'),
(10, 'test', 'test', 'Test@gmail.com', '$2b$10$QooSjXkr61CEDIrPx9NZJuBz29GBqivukeU3KYryHlmDnC72OIS0C', 'user', '2025-12-11 22:14:10'),
(11, 'Hello', 'Hello', 'Hello@gmail.com', '$2b$10$i96YJD1AB1htIihAMAfBZu6YxP9PXyIY.VzhsolfXinvPOJOpQhRS', 'user', '2025-12-11 22:17:16'),
(12, 'testing', 'testing', 'Testing@gmail.com', 'Testing@gmail.com1', 'user', '2025-12-11 22:22:09'),
(13, 'TestingAgain', 'TestingAgain', 'TestingAgain@gmail.com', '$2b$10$V3Yy0rDWHkYNoU1XeB7wZ.KDZBW.SZQBeRt/lDO5VoEOj8Q62tsnm', 'user', '2025-12-11 22:25:25'),
(14, 'Admin', 'Admin', 'Admin1@gmail.com', '$2b$10$cyzld85enVBGmr7z.U7Jz.CEzn.ybRFpKclVxGyKpMfONERlhsp2G', 'admin', '2025-12-11 22:26:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `challenges`
--
ALTER TABLE `challenges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `submissions`
--
ALTER TABLE `submissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `challenges`
--
ALTER TABLE `challenges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `submissions`
--
ALTER TABLE `submissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
