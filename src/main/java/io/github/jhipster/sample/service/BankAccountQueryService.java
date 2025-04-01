package io.github.jhipster.sample.service;

import io.github.jhipster.sample.domain.*; // for static metamodels
import io.github.jhipster.sample.domain.BankAccount;
import io.github.jhipster.sample.repository.BankAccountRepository;
import io.github.jhipster.sample.service.criteria.BankAccountCriteria;
import io.github.jhipster.sample.service.dto.BankAccountDTO;
import io.github.jhipster.sample.service.mapper.BankAccountMapper;
import jakarta.persistence.criteria.JoinType;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link BankAccount} entities in the database.
 * The main input is a {@link BankAccountCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link BankAccountDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class BankAccountQueryService extends QueryService<BankAccount> {

    private static final Logger LOG = LoggerFactory.getLogger(BankAccountQueryService.class);

    private final BankAccountRepository bankAccountRepository;

    private final BankAccountMapper bankAccountMapper;

    public BankAccountQueryService(BankAccountRepository bankAccountRepository, BankAccountMapper bankAccountMapper) {
        this.bankAccountRepository = bankAccountRepository;
        this.bankAccountMapper = bankAccountMapper;
    }

    /**
     * Return a {@link List} of {@link BankAccountDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<BankAccountDTO> findByCriteria(BankAccountCriteria criteria) {
        LOG.debug("find by criteria : {}", criteria);
        final Specification<BankAccount> specification = createSpecification(criteria);
        return bankAccountMapper.toDto(bankAccountRepository.findAll(specification));
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(BankAccountCriteria criteria) {
        LOG.debug("count by criteria : {}", criteria);
        final Specification<BankAccount> specification = createSpecification(criteria);
        return bankAccountRepository.count(specification);
    }

    /**
     * Function to convert {@link BankAccountCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<BankAccount> createSpecification(BankAccountCriteria criteria) {
        Specification<BankAccount> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            specification = Specification.allOf(
                Boolean.TRUE.equals(criteria.getDistinct()) ? distinct(criteria.getDistinct()) : null,
                buildRangeSpecification(criteria.getId(), BankAccount_.id),
                buildStringSpecification(criteria.getName(), BankAccount_.name),
                buildRangeSpecification(criteria.getBankNumber(), BankAccount_.bankNumber),
                buildRangeSpecification(criteria.getAgencyNumber(), BankAccount_.agencyNumber),
                buildRangeSpecification(criteria.getLastOperationDuration(), BankAccount_.lastOperationDuration),
                buildRangeSpecification(criteria.getMeanOperationDuration(), BankAccount_.meanOperationDuration),
                buildRangeSpecification(criteria.getBalance(), BankAccount_.balance),
                buildRangeSpecification(criteria.getOpeningDay(), BankAccount_.openingDay),
                buildRangeSpecification(criteria.getLastOperationDate(), BankAccount_.lastOperationDate),
                buildSpecification(criteria.getActive(), BankAccount_.active),
                buildSpecification(criteria.getAccountType(), BankAccount_.accountType),
                buildSpecification(criteria.getUserId(), root -> root.join(BankAccount_.user, JoinType.LEFT).get(User_.id)),
                buildSpecification(criteria.getOperationId(), root -> root.join(BankAccount_.operations, JoinType.LEFT).get(Operation_.id))
            );
        }
        return specification;
    }
}
