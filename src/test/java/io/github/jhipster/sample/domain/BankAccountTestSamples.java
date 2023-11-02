package io.github.jhipster.sample.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class BankAccountTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static BankAccount getBankAccountSample1() {
        return new BankAccount().id(1L).name("name1").bankNumber(1).agencyNumber(1L);
    }

    public static BankAccount getBankAccountSample2() {
        return new BankAccount().id(2L).name("name2").bankNumber(2).agencyNumber(2L);
    }

    public static BankAccount getBankAccountRandomSampleGenerator() {
        return new BankAccount()
            .id(longCount.incrementAndGet())
            .name(UUID.randomUUID().toString())
            .bankNumber(intCount.incrementAndGet())
            .agencyNumber(longCount.incrementAndGet());
    }
}
