package io.github.jhipster.sample.service.impl;

import io.github.jhipster.sample.domain.BankAccount;
import io.github.jhipster.sample.repository.BankAccountRepository;
import io.github.jhipster.sample.service.BankAccountService;
import io.github.jhipster.sample.service.dto.BankAccountDTO;
import io.github.jhipster.sample.service.mapper.BankAccountMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link BankAccount}.
 */
@Service
@Transactional
public class BankAccountServiceImpl implements BankAccountService {

    private final Logger log = LoggerFactory.getLogger(BankAccountServiceImpl.class);

    private final BankAccountRepository bankAccountRepository;

    private final BankAccountMapper bankAccountMapper;

    public BankAccountServiceImpl(BankAccountRepository bankAccountRepository, BankAccountMapper bankAccountMapper) {
        this.bankAccountRepository = bankAccountRepository;
        this.bankAccountMapper = bankAccountMapper;
    }

    @Override
    public BankAccountDTO save(BankAccountDTO bankAccountDTO) {
        log.debug("Request to save BankAccount : {}", bankAccountDTO);
        BankAccount bankAccount = bankAccountMapper.toEntity(bankAccountDTO);
        bankAccount = bankAccountRepository.save(bankAccount);
        return bankAccountMapper.toDto(bankAccount);
    }

    @Override
    public Optional<BankAccountDTO> partialUpdate(BankAccountDTO bankAccountDTO) {
        log.debug("Request to partially update BankAccount : {}", bankAccountDTO);

        return bankAccountRepository
            .findById(bankAccountDTO.getId())
            .map(
                existingBankAccount -> {
                    if (bankAccountDTO.getName() != null) {
                        existingBankAccount.setName(bankAccountDTO.getName());
                    }

                    if (bankAccountDTO.getBankNumber() != null) {
                        existingBankAccount.setBankNumber(bankAccountDTO.getBankNumber());
                    }

                    if (bankAccountDTO.getAgencyNumber() != null) {
                        existingBankAccount.setAgencyNumber(bankAccountDTO.getAgencyNumber());
                    }

                    if (bankAccountDTO.getLastOperationDuration() != null) {
                        existingBankAccount.setLastOperationDuration(bankAccountDTO.getLastOperationDuration());
                    }

                    if (bankAccountDTO.getMeanOperationDuration() != null) {
                        existingBankAccount.setMeanOperationDuration(bankAccountDTO.getMeanOperationDuration());
                    }

                    if (bankAccountDTO.getBalance() != null) {
                        existingBankAccount.setBalance(bankAccountDTO.getBalance());
                    }

                    if (bankAccountDTO.getOpeningDay() != null) {
                        existingBankAccount.setOpeningDay(bankAccountDTO.getOpeningDay());
                    }

                    if (bankAccountDTO.getLastOperationDate() != null) {
                        existingBankAccount.setLastOperationDate(bankAccountDTO.getLastOperationDate());
                    }

                    if (bankAccountDTO.getActive() != null) {
                        existingBankAccount.setActive(bankAccountDTO.getActive());
                    }

                    if (bankAccountDTO.getAccountType() != null) {
                        existingBankAccount.setAccountType(bankAccountDTO.getAccountType());
                    }

                    if (bankAccountDTO.getAttachment() != null) {
                        existingBankAccount.setAttachment(bankAccountDTO.getAttachment());
                    }
                    if (bankAccountDTO.getAttachmentContentType() != null) {
                        existingBankAccount.setAttachmentContentType(bankAccountDTO.getAttachmentContentType());
                    }

                    if (bankAccountDTO.getDescription() != null) {
                        existingBankAccount.setDescription(bankAccountDTO.getDescription());
                    }

                    return existingBankAccount;
                }
            )
            .map(bankAccountRepository::save)
            .map(bankAccountMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BankAccountDTO> findAll() {
        log.debug("Request to get all BankAccounts");
        return bankAccountRepository.findAll().stream().map(bankAccountMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<BankAccountDTO> findOne(Long id) {
        log.debug("Request to get BankAccount : {}", id);
        return bankAccountRepository.findById(id).map(bankAccountMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete BankAccount : {}", id);
        bankAccountRepository.deleteById(id);
    }
}
