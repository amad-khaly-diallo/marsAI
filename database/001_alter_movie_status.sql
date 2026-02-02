-- Migration unique pour adapter la table `movie` aux besoins métier marsAI
-- À exécuter manuellement sur la base `marsAi`

ALTER TABLE `movie`
  MODIFY `status` ENUM('in_process', 'approved', 'rejected', 'selected') DEFAULT 'in_process',
  ADD COLUMN `decision_reason` TEXT NULL AFTER `status`,
  ADD COLUMN `decision_at` DATETIME NULL AFTER `decision_reason`;

